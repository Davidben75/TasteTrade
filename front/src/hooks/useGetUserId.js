export const useGetUserId = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.id;
  };
  