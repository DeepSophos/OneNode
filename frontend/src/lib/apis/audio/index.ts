import { AUDIO_API_BASE_URL } from '$lib/constants';


export const uploadAudio = async (audioBlob) => {
    const formData = new FormData();
    formData.append('files', audioBlob, 'recording.wav');
    formData.append('keys', 'recording');
    formData.append('lang', 'auto');

    let textContent = '';
    try {
        const response = await fetch(`${AUDIO_API_BASE_URL}/api/v1/asr`, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        if (data.result && data.result.length > 0) {
            textContent = data.result[0].text || 'No transcription available';
        } else {
            textContent = '';
        }
    } catch (error) {
            textContent = ''
    }
    return textContent;
}

export const checkAudioService = async () => {
    try {
        const response = await fetch(AUDIO_API_BASE_URL+"/", {
            method: 'GET'
        })
        .then(async (res) => {
            return true;
         })
         .catch((err) => {
            return false;
         })
        return response;
    } catch (error) {
        return false;
    }
    return false;
}
