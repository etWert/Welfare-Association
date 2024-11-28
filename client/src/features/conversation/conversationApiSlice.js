import apiSlice from "../../app/apiSlice";

const conversationApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getAllConversation: build.query({
            query: () => ({
                url: "/api/conversation"
            }),
            providesTags: ["Conversations"]
        }),
        addConversation: build.mutation({
            query: (conversation) => ({
                url: "/api/conversation",
                method: "POST",
                body: conversation
            }),
            invalidatesTags: ["Conversations"]
        }),
        updateConversation: build.mutation({
            query: (conversation) => ({
                url: "/api/conversation",
                method: "PUT",
                body: conversation
            }),
            invalidatesTags: ["Conversations"]
        }),
        deleteConversation: build.mutation({
            query: ({ id }) => ({
                url: "/api/conversation",
                method: "DELETE",
                body: { id }
            }),
            invalidatesTags: ["Conversations"]
        })
    })
})
export const { useGetAllConversationQuery,useAddConversationMutation,useUpdateConversationMutation,useDeleteConversationMutation  } = conversationApiSlice