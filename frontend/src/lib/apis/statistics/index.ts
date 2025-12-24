import { STATISTICS_API_BASE_URL} from '$lib/constants';

export const queryStatisticsData = async (token: string = '', queryData) => {
  let controller = new AbortController();
  let error = null;
  const res = await fetch(`${STATISTICS_API_BASE_URL}/statisticsData`, {
    signal: controller.signal,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token && { authorization: `Bearer ${token}` })
    },
    body: JSON.stringify({options:queryData}),
  })
    .catch((err) => {
      error = err;
      console.log(err);
      return null;
    });

  if (error) {
    throw error;
  }

  return [res, controller];
}
//
//
// interface QueryStatisticsDataForm {
//     options: Record<string, any>;
// }
//
// interface StatisticsData {
//     // 根据实际返回的数据结构定义类型
//     [key: string]: any;
// }
//
// // 直接使用的函数版本
// export async function queryStatisticsData(
//     token: string,
//     options: Record<string, any>,
//     onData?: (data: StatisticsData) => void,
//     onError?: (error: Error) => void,
//     onComplete?: () => void
// ): Promise<StatisticsData[]> {
//     const requestBody: QueryStatisticsDataForm = {
//         options
//     };
//
//     const results: StatisticsData[] = [];
//
//     try {
//         const response = await fetch(`${STATISTICS_API_BASE_URL}/statisticsData`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 ...(token && {'Authorization': `Bearer ${token}`})
//             },
//             body: JSON.stringify({options: {}})
//         });
//
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//
//         if (!response.body) {
//             throw new Error('Response body is null');
//         }
//
//         const reader = response.body.getReader();
//         const decoder = new TextDecoder();
//
//         try {
//             while (true) {
//                 const {done, value} = await reader.read();
//                 if (done) {
//                     onComplete?.();
//                     break;
//                 }
//                 const chunk = decoder.decode(value, {stream: true});
//                 // 处理可能的多个 JSON 对象
//                 const lines = chunk.split('\n').filter(line => line.trim());
//                 for (const line of lines) {
//                     try {
//                         const data = JSON.parse(line);
//                         results.push(data);
//                         onData?.(data);
//                     } catch (parseError) {
//                         console.warn('Failed to parse JSON:', line, parseError);
//                     }
//                 }
//             }
//         } finally {
//             reader.releaseLock();
//         }
//
//         return results;
//     } catch (error) {
//         onError?.(error as Error);
//         throw error;
//     }
// }
