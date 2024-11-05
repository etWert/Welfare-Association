import apiSlice from "../../app/apiSlice";

const familiesApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getAllFamilies: build.query({
            query: () => ({
                url: "/api/family"
            }),
            providesTags: ["Families"]
        }),
        addFamily: build.mutation({
            query: (family) => ({
                url: "/api/family",
                method: "POST",
                body: family
            }),
            invalidatesTags: ["Families"]
        }),
        updateFamily: build.mutation({
            query: (family) => ({
                url: "/api/family",
                method: "PUT",
                body: family
            }),
            invalidatesTags: ["Families"]
        }),
        deleteFamily: build.mutation({
            query: ({ _id }) => ({
                url: "/api/family",
                method: "DELETE",
                body: { _id }
            }),
            invalidatesTags: ["Families"]
        }),
        updateTzFile: build.mutation({
            query: ({ id, tzFile }) => {
                const formData = new FormData();
                formData.append("tzFile", tzFile);
                return {
                    url: `/api/family/${id}`,
                    method: "PUT",
                    body: formData
                };
            },
            invalidatesTags: ["Families"]
        }),
        
        
        
    })

})
export const { useGetAllFamiliesQuery, useAddFamilyMutation, useUpdateFamilyMutation, useDeleteFamilyMutation ,useUpdateTzFileMutation} = familiesApiSlice