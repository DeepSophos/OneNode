<script>
  import { onMount, createEventDispatcher } from 'svelte';
  import { inner_prompt } from '$lib/stores';

  const dispatch = createEventDispatcher();

  // Chapter options for the dropdown
  const chapterOptions = [
    { id: '1', title: '安全文明施工管理体系及控制措施' },
    { id: '2', title: '混凝土施工工艺' },
    { id: '3', title: '预埋件埋设工程' },
  ];

  let selectedChapter = chapterOptions[0];
  export let selectedChapterIndex = 0;
  let isDropdownOpen = false;
  let inputText = '';
  let dropdownRef;
  let inputRef;

  // Handle click outside to close dropdown
  function handleClickOutside(event) {
    if (dropdownRef && !dropdownRef.contains(event.target) && !isButton(event.target)) {
      isDropdownOpen = false;
    }
  }

  function isButton(element) {
    return element.classList.contains('chapter-button') ||
           element.parentElement.classList.contains('chapter-button');
  }

  function toggleDropdown() {
    isDropdownOpen = !isDropdownOpen;
  }

  function selectChapter(chapter, index) {
    selectedChapter = chapter;
    selectedChapterIndex = index;
    isDropdownOpen = false;
  }

  function handleSubmit() {
    inner_prompt.set(inputText);
    inputText = ''; // Clear the input after sending
  }

  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });
</script>

<div class="flex flex-col items-center justify-center w-full max-w-3xl mx-auto pt-36">
  <h1 class="text-3xl font-bold text-center mb-16 mt-8">文档生成器功能验证原型</h1>

  <div class="w-full mb-6">
    <p class="text-lg mb-5">生成目标: 包5兴城输水发电系统施工的技术投标文件</p>

    <p class="text-lg mb-2">章节选择</p>

    <div class="relative w-full">
      <!-- Chapter selector button with dropdown -->
      <button
        class="chapter-button relative w-full text-left px-4 py-3 bg-white shadow-lg border border-gray-300 rounded-2xl shadow-sm focus:outline-none"
        on:click={toggleDropdown}
      >
        <div class="flex justify-between items-center">
          <span>{selectedChapter.id} {selectedChapter.title}</span>
          <svg
            class="w-5 h-5 transform transition-transform duration-200"
            class:rotate-180={isDropdownOpen}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </button>

      <!-- Dropdown menu -->
      {#if isDropdownOpen}
        <div
          bind:this={dropdownRef}
          class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg"
        >
          {#each chapterOptions as chapter, i}
            <div
              class="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200 last:border-0"
              on:click={() => selectChapter(chapter, i)}
              class:font-medium={selectedChapter.id === chapter.id}
            >
              {chapter.id} {chapter.title}
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>

  <!-- Input field for chapter content requirements -->
  <div class="w-full p-6 bg-white border border-gray-200 rounded-2xl shadow-lg input-container">
    <input
      bind:this={inputRef}
      bind:value={inputText}
      placeholder="请输入该章节生成的需求"
      on:input={(e) => {
         e.target.style.height = '';
         e.target.style.height = `${e.target.scrollHeight}px`;
      }}
      class="w-full p-2 text-base border-none focus:outline-none"
    />

    <div class="flex justify-end mt-4">
      <button
        on:click={handleSubmit}
        class="arrow-button bg-black text-white rounded-full p-3 flex items-center justify-center w-10 h-10"
        aria-label="Submit"
      >
        <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 6L18.3301 16.5H5.66992L12 6Z" fill="currentColor" transform="rotate(180 12 12)"/>
        </svg>
      </button>
    </div>
  </div>
</div>

<style>
    .container {
      max-width: 500px;
      margin: 40px auto;
    }

    .input-container {
      position: relative;
      width: 100%;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      padding: 16px 20px;
      margin-bottom: 20px;
      border: 1px solid rgba(0, 0, 0, 0.1);
    }

    .input-field {
      width: 100%;
      border: none;
      font-size: 16px;
      padding: 8px 0;
      background: transparent;
    }

    .input-field:focus {
      outline: none;
    }

    .button-container {
      display: flex;
      justify-content: flex-end;
      margin-top: 8px;
    }

    .arrow-button {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #000;
      color: #fff;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      padding: 0;
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .arrow-button:hover {
      background-color: #333;
      transform: translateY(-2px);
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    }

    .arrow-button:active {
      transform: translateY(0);
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    }

    .arrow-button:focus {
      outline: none;
    }

    .arrow-icon {
      width: 16px;
      height: 16px;
    }
</style>