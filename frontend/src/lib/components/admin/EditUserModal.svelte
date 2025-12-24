<script lang="ts">
    import {toast} from 'svelte-sonner';
    import dayjs from 'dayjs';
    import {createEventDispatcher} from 'svelte';
    import {onMount, getContext} from 'svelte';

    import {updateUserById} from '$lib/apis/users';
    import Modal from '../common/Modal.svelte';
    import {user} from "$lib/stores";
    import {verifyPasswordReg} from "$lib/utils";

    const i18n = getContext('i18n');
    const dispatch = createEventDispatcher();

    export let show = false;
    export let selectedUser;
    export let sessionUser;

    let _user = {
        profile_image_url: '',
        name: '',
        email: '',
        password: ''
    };
    let passwordErr = '';
    function verifyPasswordOne() {
		passwordErr = verifyPasswordReg(_user.password);
	}

    const submitHandler = async () => {
        console.log(_user)
        const res = await updateUserById(localStorage.token, selectedUser.id, _user).catch((error) => {
            toast.error(error);
        });

        if (res) {
            dispatch('save',{userName:res.name});
            show = false;
        }
    };

    onMount(() => {
        if (selectedUser) {
            _user = selectedUser;
            _user.password = '';
        }
    });
		function formatTimestamp(timestamp) {
        // 如果时间戳小于 10000000000，则认为是秒级时间戳，需要乘以1000
        if (timestamp < 10000000000) {
            return timestamp * 1000;
        }
        // 否则认为已经是毫秒级时间戳
        return timestamp;
    }
</script>

<Modal size="sm" bind:show>
    <div class="text-sm">
        <div class=" flex justify-between dark:text-gray-300 px-5 py-4">
            <div class=" font-bold self-center">{$i18n.t('Edit User')}</div>
            <button
                    class="self-center"
                    on:click={() => {
					show = false;
				}}
            >
                <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        class="w-5 h-5"
                >
                    <path
                            d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
                    />
                </svg>
            </button>
        </div>
        <hr class=" dark:border-gray-800"/>

        <div class="flex flex-col md:flex-row w-full p-5 md:space-x-4 dark:text-gray-200">
            <div class=" flex flex-col w-full sm:flex-row sm:justify-center sm:space-x-6">
                <form
                        class="flex flex-col w-full"
                        on:submit|preventDefault={() => {
						submitHandler();
					}}
                >
                    <div class=" flex items-center rounded-md py-2 px-4 w-full">
                        <div class=" self-center mr-5">
                            {#if selectedUser.profile_image_url && selectedUser.profile_image_url != "/user.png"}
                                <div class="flex-shrink-0 h-10 w-10">
                                    <img class="h-10 w-10 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700"
                                         src={selectedUser.profile_image_url}
                                         alt="用户头像"/>
                                </div>
                            {:else}
                                <div class="w-10 h-10 rounded-full bg-gradient-to-r from-violet-600 to-pink-500 flex items-center justify-center text-white font-medium text-sm">
                                    {selectedUser.name.charAt(0).toUpperCase()}
                                </div>
                            {/if}
                        </div>

                        <div>
                            <div class=" self-center capitalize font-semibold">{selectedUser.name}</div>

                            <div class="text-xs text-gray-500">
                                {$i18n.t('Created at')}
                                {dayjs(formatTimestamp(selectedUser.timestamp)).format($i18n.t('MMMM DD, YYYY'))}
                            </div>
                        </div>
                    </div>

                    <hr class=" dark:border-gray-800 my-3 w-full"/>

                    <div class=" flex flex-col space-y-1.5">
                        <div class="flex flex-col w-full">
                            <div class=" mb-1 text-xs text-gray-500">账号/手机号</div>
                            <div class="flex-1">
                                <div
                                        class="w-full rounded py-2 px-4 text-sm dark:text-gray-300 dark:bg-gray-800 disabled:text-gray-500 dark:disabled:text-gray-500 outline-none"
                                >
                                    {_user.email}
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col w-full">
                            <div class=" mb-1 text-xs text-gray-500">{$i18n.t('New Password')}</div>
                            <div class="flex-1">
                                <input
                                        class="w-full rounded py-2 px-4 text-sm dark:text-gray-300 dark:bg-gray-800 outline-none"
                                        type="password"
                                        maxlength="20"
                                        bind:value={_user.password}
                                        on:input={verifyPasswordOne}
                                        autocomplete="new-password"
                                />
                            </div>
                            {#if passwordErr}
							    <i class="text-red-500 text-xs mt-1">{passwordErr}</i>
						    {/if}
                        </div>
                    </div>

                    <div class="flex justify-end pt-3 text-sm font-medium">
                        <button
                                class=" px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-gray-100 transition rounded"
                                type="submit"
                        >
                            {$i18n.t('Save')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</Modal>

<style>
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        /* display: none; <- Crashes Chrome on hover */
        -webkit-appearance: none;
        margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
    }

    .tabs::-webkit-scrollbar {
        display: none; /* for Chrome, Safari and Opera */
    }

    .tabs {
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
    }

    input[type='number'] {
        -moz-appearance: textfield; /* Firefox */
    }
</style>
