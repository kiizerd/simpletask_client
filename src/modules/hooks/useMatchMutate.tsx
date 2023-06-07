import { type MutatorCallback, useSWRConfig } from "swr";

// Regexs
//
// `^projects/${projectId}/(sections/${sectionId}|tasks/${id}/)$`

type MatchMutator = (
  matcher: RegExp | string,
  data?: MutatorCallback,
  opts?: any
) => Promise<void>;

export default function useMatchMutate(): MatchMutator {
  const { cache, mutate } = useSWRConfig();

  return async (
    matcher: RegExp | string,
    data?: MutatorCallback,
    opts?: any
  ) => {
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

    keys.map(async (key) => await mutate(key, data, opts));
  };
}
