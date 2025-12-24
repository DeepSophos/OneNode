<script lang="ts">
    import {onMount} from 'svelte';
    import {marked} from 'marked';

    const {...defaults} = marked.getDefaults() as marked.MarkedOptions & {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        extensions: any;
    };
    const renderer = new marked.Renderer();
    export let steps: {
        title: string;
        subTitle: string;
        content: string;
        status: 'activate' | 'completed' | 'current';
    }[] = [{
        title:'补全问题',
        subTitle:'',
        content:'正在补全问题...',
        status:'current'
    }];

    export let done = false;

    let isActive = true;
    let profile = "";
    let times = 0;
    let autoScroll = false;
    let cssColor1;
    $:handleDone(done);
    $:if (!done && steps.length > 0) contentChange();
    $:cssColor1 = document.documentElement.classList.contains("dark") ? "#313131" : "#ffffff";

    let intervalId = setInterval(() => {
        times++;
    }, 1000);

    function handleDone(state: boolean) {
        isActive = !state
        if (state) clearInterval(intervalId);
    }

    function handleStepClick(index: number, event) {
        const parentDom = event.currentTarget.closest('.stepper-container');
        const container = parentDom?.querySelector('.stepper-content');
        const section = container?.querySelector(`.sec${index}`);
        if (container && section) {
            container.scrollTo({
                top: section.offsetTop - container.offsetTop - 25,
                behavior: 'smooth'
            });
        }
    }

    function updateActiveStep() {
        const container = document.querySelector('.stepper-content');
        if (!container) return;

        const sections = container.querySelectorAll('section');
        const containerTop = container.scrollTop;
        const containerHeight = container.clientHeight;
        const containerCenter = containerTop + (containerHeight / 2);

        let activeIndex = 0;
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop - container.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (containerCenter >= sectionTop && containerCenter <= sectionBottom) {
                activeIndex = index;
            }
        });

        // 更新导航项状态
        steps = steps.map((step, index) => ({
            ...step,
            status: step.status == 'current' ? 'current' : (index === activeIndex ? 'activate' : 'completed')
        }));

        //判断是否自动滚动
        autoScroll = false;
        const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 1;
        if (isAtBottom) {
            autoScroll = true;
        }
    }

    function contentChange() {
        const containers = document.querySelectorAll('.stepper-content');
        const container = containers.length > 0 ? containers[containers.length - 1] : null;
        if (container && autoScroll) {
            container.scrollTop = container.scrollHeight;
        }

        if (steps.length > 0) {
            let lastContent = steps[steps.length - 1].content;
            if (lastContent.length > 0)
                profile = lastContent;
        }

    }

    onMount(() => {
        const containers = document.querySelectorAll('.stepper-content');
        let container = containers.length > 0 ? containers[containers.length - 1] : null;
        if (container) {
            container.addEventListener('scroll', updateActiveStep);
            // 初始化状态
            updateActiveStep();
        }

        return () => {
            if (container) {
                container.removeEventListener('scroll', updateActiveStep);
            }
        };

    });

</script>
<div class="stepper-container" class:h={!isActive} style="--color1: {cssColor1}">
    <div class="stepper-nav">
        <div class="des">
            <span>
            <svg viewBox="0 0 24 24" width="16" height="16">
              <circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" stroke-width="1.5"/>
              <path d="M16 16 L22 22" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            </span>
            <h2>
                {done ? "回答完成" : "回答中"}
            </h2>
            <div>{times > 0 ? times + "s" : ""}</div>
        </div>
        <div>
            {#each steps as step, index}
                <a class="nav-item {step.status}"
                   on:click={(event) => handleStepClick(index, event)}
                   href="#">
                    <div class="step-indicator">
                        <div class="step-circle">
                            {#if step.status === 'completed' || step.status === 'activate'}
                                <svg class="check-icon" viewBox="0 0 24 24" fill="none">
                                    <path d="M5 12l5 5L20 7" stroke="currentColor" stroke-width="2.5"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"/>
                                </svg>
                            {:else if step.status === 'current'}
                                <svg class="loading-arc" viewBox="0 0 24 24">
                                    <circle
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            fill="none"
                                            stroke="rgb(59,130,246)"
                                            stroke-width="2.5"
                                            stroke-linecap="round"
                                            stroke-dasharray="16 50"
                                            pathLength="66"
                                    />
                                </svg>
                            {:else}
                                {index + 1}
                            {/if}
                        </div>

                    </div>
                    {#if index !== steps.length - 1}
                        <div class="step-line"></div>
                    {/if}
                    <span class="nav-title">{step.title}</span>
                </a>
            {/each}
        </div>
    </div>
    <div class="stepper-content">
        <div class="expand" on:click={() => isActive = !isActive}>
            <span style="transform: {isActive ? 'rotate(-180deg)' : 'rotate(0deg)'};transition: all 0.3s;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 9L12 16L19 9" fill="none" stroke="currentColor"/>
                </svg>
            </span>
            <span class="small-title">{done ? "回答完成" : "回答中"}</span>
            <span class="d">{profile}</span>
        </div>
        <div>
            {#each steps as step, index}
                <section class="sec{index}">
                    <div class="content-item">
                        {@html marked.parse(step.content, {
                            ...defaults,
                            gfm: true,
                            breaks: true,
                            renderer
                        })}

                    </div>
                </section>
            {/each}
        </div>
    </div>
</div>

<style>
    .stepper-container {
        border: solid 1px rgb(229, 228, 227);
        border-radius: 0.5rem;
        display: grid;
        grid-template-columns: 28% 1fr;
        margin: 1.5rem auto;
        min-height: 25rem;
    }

    .stepper-nav {
        padding: 1rem;
        border-radius: 0.5rem 0 0 0.5rem;
        border-right: solid 1px rgb(229, 228, 227);
    }

    .stepper-nav .des {
        margin: 0 0 2rem 0;
    }

    .stepper-nav .des span {
        float: left;
        margin: 0.4rem 0 0 -0.2rem;
    }

    .stepper-nav .des h2 {
        font-family: fantasy;
        font-style: normal;
        margin-left: 1.2rem;
        font-size: 1.2rem;

    }

    .stepper-nav .des div {
        font-size: 0.8rem;
        text-indent: 1.2rem;
    }

    .nav-item {
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
        padding: 0 0 1.8rem 0;
        border-radius: 0.375rem;
        cursor: pointer;
        transition: all 0.2s;
        position: relative;
    }

    .nav-item:hover .nav-title,
    .nav-item:hover .step-circle,
    .nav-item.activate .nav-title,
    .nav-item.activate .step-circle {
        opacity: 1;
    }

    .step-indicator {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .step-circle {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        color: #6b7280;
        position: relative;
        z-index: 1;
        opacity: 0.8;
    }

    .step-line {
        width: 2px;
        height: 100%;
        background-color: #e5e7eb;
        margin-left: 9px;
        position: absolute;

    }

    .completed .step-circle, .activate .step-circle {
        background-color: rgb(59, 130, 246);
        color: white;
        width: 20px;
        height: 20px;
    }

    .current .step-circle {
        width: 20px;
        height: 20px;
        opacity: 1;
    }

    .current .nav-title {
        opacity: 1;
    }

    .nav-title {
        font-size: 0.875rem;
        color: #374151;
        font-weight: 500;
        transition: color 0.2s;
        padding-top: 0.125rem;
        opacity: 0.6;
    }

    .check-icon {
        width: 12px;
        height: 12px;
        stroke: white;
    }

    .loading-arc {
        width: 20px;
        height: 20px;
        animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    .stepper-content {
        background-color: #ffffff;
        border-radius: 0 0.5rem 0.5rem 0;
        max-height: 500px;
        overflow: auto;
        opacity: 0.6;

        &::-webkit-scrollbar {
            display: none;
        }

        scrollbar-width: none;
        -ms-overflow-style: none;
        color: #374151;
    }

    .stepper-content::after {
        content: '';
        width: 100%;
        height: 1rem;
        display: flex;
        left: 0;
        bottom: 0;
        background: linear-gradient(to top, #ffffff 15%, #ffffff00);
        position: sticky;
    }

    .stepper-content .expand {
        height: 2.5rem;
        background: linear-gradient(to bottom, #ffffff 70%, #ffffff00);
        position: sticky;
        top: 0;
        cursor: pointer;
    }


    .stepper-content .expand span {
        float: right;
        margin: 0.2rem 0.5rem;
    }

    .stepper-content .expand span.small-title, .stepper-content .expand span.d {
        display: none;
        width: calc(100% - 4rem);
        height: 100%;
        line-height: 2.3rem;
        overflow: hidden;
        float: left;
        margin: 0;
        flex-direction: column-reverse;
        font-size: 0.8rem;

        &::-webkit-scrollbar {
            display: none;
        }

        scrollbar-width: none;
        -ms-overflow-style: none;
    }

    .stepper-content section {
        padding: 0.6rem 1.2rem;
    }

    .content-item {
        font-size: 0.875rem;
        line-height: 1.5;
    }

    .h.stepper-container {
        min-height: 2rem;
        grid-template-columns: auto 1fr
    }

    .h .stepper-nav {
        border-right: none;
        padding: 0.5rem 1rem;
    }

    .h .stepper-nav .des {
        margin-bottom: 0;
    }

    .h .stepper-nav .des span {
        margin-top: 0.23rem;
    }

    .h .stepper-nav .des h2 {
        font-size: 1rem;
    }

    .h .stepper-content, .h .stepper-content .expand {
        background: transparent;
    }

    .h .stepper-content .expand span:first-child {
        margin: 0.5rem;
    }

    .h .stepper-content .expand span.d {
        display: flex;
    }

    .h .nav-item, .h .stepper-content section, .h .stepper-content::after, .h .stepper-nav .des div {
        display: none;
    }

    @media (max-width: 600px) {
        .stepper-container {
            display: block;
            background: var(--color1);
        }

        .stepper-content .expand span.small-title {
            display: block;
            margin: 0.2rem 0.5rem 0;
            font-size: 1rem;
        }

        .stepper-nav, .h .stepper-content .expand span.d {
            display: none;
        }

    }

    :global(.dark) .stepper-container, .stepper-nav {
        border-color: rgba(229, 228, 227, 0.2);
    }

    :global(.dark) .step-line {
        background-color: rgba(229 231 235 / 16%);
    }

    :global(.dark) .nav-title {
        color: rgb(151 153 155);
    }

    :global(.dark) .stepper-content {
        background-color: #313131;
        color: rgb(158 159 161);
    }

    :global(.dark) .stepper-content .expand {
        background: linear-gradient(to bottom, #313131 70%, #31313100);
    }

    :global(.dark) .stepper-content::after {
        background: linear-gradient(to top, #313131 70%, #31313100);
    }

    :global(.dark) .h .stepper-content,
    :global(.dark) .h .stepper-content .expand,
    :global(.dark) .h .stepper-content .expand span.d {
        background: transparent;
    }
</style> 