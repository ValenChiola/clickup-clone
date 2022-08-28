export const useLocalStorage = () => {

    const clear = () => localStorage.clear()
    const getItem = <T>(key: string) => JSON.parse(localStorage.getItem(key) ?? '[]') as T
    const setItem = <T>(key: string, value: T) => localStorage.setItem(key, JSON.stringify(value))
    const deleteItem = (key: string) => localStorage.removeItem(key)

   return  {
        clear,
        getItem,
        setItem,
        deleteItem
   }
}
