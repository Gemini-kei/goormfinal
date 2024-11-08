
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/components/axiosInstance';
import { GetApiMembersSignUpResponse, PostApiMembersRequest } from '@/lib/authType';
import { useRouter } from 'next/navigation';


const signUp = async (signupData: PostApiMembersRequest) => {
  const API_URL = "/signup"
  const response = await axiosInstance.post<GetApiMembersSignUpResponse>(API_URL,signupData);
  return response.data;
}

export const useSignUp = () => {
  const router = useRouter()

  return useMutation<GetApiMembersSignUpResponse, Error, PostApiMembersRequest>({
    mutationFn:signUp,
    onSuccess: (data) => {
        console.log("success", data);
        router.push('/login')

    },
    onError:() => {
      console.log("error");
    },
  })
}
