import apiSlice from "../../app/apiSlice";

const employeeApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getAllEmployees: build.query({
            query: () => ({
                url: "/api/employee"
            }),
            providesTags: ["Employees"]
        }),
        addEmployee: build.mutation({
            query: (employee) => ({
                url: "/api/employee",
                method: "POST",
                body: employee
            }),
            invalidatesTags: ["Employees"]
        }),
        updateEmployee: build.mutation({
            query: (employee) => ({
                url: "/api/employee",
                method: "PUT",
                body: employee
            }),
            invalidatesTags: ["Employees"]
        }),
        deleteEmployee: build.mutation({
            query: ({ id }) => ({
                url: "/api/employee",
                method: "DELETE",
                body: { id }
            }),
            invalidatesTags: ["Employees"]
        })
    })
})
export const { useGetAllEmployeesQuery, useAddEmployeeMutation, useUpdateEmployeeMutation, useDeleteEmployeeMutation } = employeeApiSlice