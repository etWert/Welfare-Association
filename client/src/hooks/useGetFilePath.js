const useGetFilePath = () => {
    const getFilePath = (tzFile) => {
        if (tzFile) {
            return `http://localhost:1111/uploads/${tzFile}`; 
        } else {
            return "";
        }
    }

    return { getFilePath }
}

export default useGetFilePath;
