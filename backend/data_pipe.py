import json
import weakref
import asyncio
import threading
from concurrent.futures import ThreadPoolExecutor
from typing import Any
import logging
import traceback

log = logging.getLogger(__name__)
log.setLevel('INFO')


class HybridQueue:
    def __init__(self, maxsize: int = 0):
        """Initialize the hybrid queue with an asyncio.Queue."""
        self.loop = asyncio.get_event_loop()
        self.queue = asyncio.Queue(maxsize=maxsize)

    async def async_put(self, item: Any) -> None:
        """Asynchronous method to put an item into the queue."""
        await self.queue.put(item)

    async def async_get(self) -> Any:
        """Asynchronous method to get an item from the queue."""
        return await self.queue.get()

    def sync_put(self, item: Any, timeout: float = None) -> None:
        """Synchronous method to put an item into the queue."""
        future = asyncio.run_coroutine_threadsafe(self.queue.put(item), self.loop)
        future.result(timeout=timeout)

    def sync_get(self, timeout: float = None) -> Any:
        """Synchronous method to get an item from the queue."""
        future = asyncio.run_coroutine_threadsafe(self.queue.get(), self.loop)
        return future.result(timeout=timeout)

    def task_done(self) -> None:
        """Mark a task as done, usable from both sync and async contexts."""
        self.queue.task_done()

    def qsize(self) -> int:
        """Return the approximate size of the queue."""
        return self.queue.qsize()


class DataPipe:
    def __init__(self, owner):
        self.owner = weakref.ref(owner)
        self.in_q = HybridQueue(1000)
        self.out_q = HybridQueue(1000)
        self.out_q_quit = False

    async def frontend_event_generator(self):
        self.out_q_quit = False
        log.info("frontend_event_generator start")
        while not self.out_q_quit:
            item = await self.out_q.async_get()
            log.info(f"frontend_event_generator, async_get() = {item}")
            self.out_q.task_done()
            yield item
            try:
                message_object = json.loads(item)
                if message_object.get("command") == "end":
                    break
            except Exception as e:
                log.info(e)
                log.info(traceback.format_exc())
                pass
        self.in_q = HybridQueue(1000)
        self.out_q = HybridQueue(1000)
        log.info("frontend_event_generator exit")

    def print(self):
        pass

    def set_provider(self):
        pass

    async def write_to_frontend(self, app_id, agent_id, message, role='', type='markdown', channel='prompt', thread=''):
        if message == '\b' or message == '\r':
            await self.out_q.async_put(json.dumps({'channel': channel, 'command': 'rewind', 'role': role, 'data': 1, 'thread': thread})+'\n')
        elif message == '\a':
            await self.out_q.async_put(json.dumps({'channel': channel, 'command': 'anchor_start', 'role': role, 'data': 1, 'thread': thread})+'\n')
        elif message.startswith(r'\s'):
            await self.out_q.async_put(json.dumps({'channel': 'progress', 'command': 'new_step', 'role': role, 'data': {'type': type, 'content': message[2:]}, 'thread': thread})+'\n')
        elif message.startswith(r'\e'):
            await self.out_q.async_put(json.dumps({'channel': 'control', 'command': 'end', 'role': role, 'data': {'type': type, 'content': message[2:]}, 'thread': thread})+'\n')
        elif message.startswith(r'\u'):
            await self.out_q.async_put(message[2:]+'\n')
        elif message != '':
            await self.out_q.async_put(json.dumps({'channel': channel, 'command': 'append', 'role': role, 'data': {'app_id': app_id, 'agent_id': agent_id, 'type': type, 'content': message},'thread': thread})+'\n')

        # log.info(f"out_q.async_put({message})")

    async def stop_streaming(self):
        while (self.out_q.qsize() > 0):
            await asyncio.sleep(1)
        self.out_q_quit = True
        log.info("stop streaming")

    async def read_from_frontend(self):
        return await self.in_q.async_get()

    async def put_to_input_queue(self, message):
        await self.in_q.async_put(message)
        log.info(f"in_q.async_put({message})")
