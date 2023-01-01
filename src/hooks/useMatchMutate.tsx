import { MutatorCallback, useSWRConfig } from "swr";

// Regexs
//
//`^projects/${projectId}/(sections/${sectionId}|tasks/${id}/)$`

export default function useMatchMutate() {
  const { cache, mutate } = useSWRConfig();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (matcher: RegExp | string, data?: MutatorCallback, opts?: any) => {
    if (!(cache instanceof Map)) {
      throw new Error(
        "matchMutate requires the cache provider to be a Map instance"
      );
    }

    const keys = [];

    for (const key of cache.keys()) {
      if (matcher instanceof RegExp) {
        if (matcher.test(key)) {
          keys.push(key);
        }
      } else if (typeof matcher === "string") {
        const regex = new RegExp(matcher);
        if (regex.test(key)) {
          keys.push(key);
        }
      }
    }

    const mutations = keys.map((key) => mutate(key, data, opts));
    return Promise.all(mutations);
  };
}
