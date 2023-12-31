import fetcher from "@/libs/fetcher";
import useSWR from "swr";

const useCurrentUser = () => {
  const { data, isLoading, error, mutate } = useSWR("/api/current", fetcher);
  if (data) {
    // console.log({ From_UseCurrentUser: data });
  }

  return {
    data,
    isLoading,
    error,
    mutate,
  };
};

export default useCurrentUser;

// Normal Fetch
// import fetcher from "@/libs/fetcher";
// const useCurrentUser = () => {
//   const data = fetcher("/api/current");
//   console.log({ From_UseCurrentUser: data });
// };

// export default useCurrentUser
