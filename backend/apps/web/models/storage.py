import time
from typing import Any, Optional


class ExpiringStorage:
    def __init__(self):
        self._storage = {}
        self._expiries = {}

    def set(self, key: str, value: Any, ttl: float) -> None:
        """
        设置键值对并指定存活时间（秒）
        :param key: 键
        :param value: 值
        :param ttl: 存活时间（秒）
        """
        self._storage[key] = value
        self._expiries[key] = time.time() + ttl

    def get(self, key: str) -> Optional[Any]:
        """
        获取键对应的值，如果键不存在或已过期返回None
        :param key: 键
        :return: 值或None
        """
        self.clear_expired()

        if key not in self._storage:
            return None

        if self._is_expired(key):
            self.delete(key)
            return None

        val = self._storage[key]
        del self._storage[key]
        del self._expiries[key]
        return val

    def delete(self, key: str) -> bool:
        """
        删除指定键
        :param key: 键
        :return: 是否成功删除
        """
        if key in self._storage:
            del self._storage[key]
            del self._expiries[key]
            return True
        return False

    def _is_expired(self, key: str) -> bool:
        """
        检查键是否已过期
        :param key: 键
        :return: 是否过期
        """
        return key in self._expiries and time.time() > self._expiries[key]

    def clear_expired(self) -> None:
        """
        清理所有已过期的键值对
        """
        expired_keys = [key for key in self._expiries if self._is_expired(key)]
        for key in expired_keys:
            self.delete(key)
