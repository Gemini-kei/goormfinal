
const emailCheck = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export const validateField = (name: string, value: string, password?: string) => {
  switch (name) {
    case "email":
      if (!emailCheck.test(value)) return "유효한 이메일을 입력해주세요.";
      break;
    case "password":
      if (value.length < 4) return "비밀번호는 최소 4자 이상이어야 합니다.";
      break;
    case "confirmPassword":
      if (value !== password) return "비밀번호가 일치하지 않습니다.";
      break;
    case "name":
      if (value.trim() === "") return "이름을 입력해주세요.";
      break;
    default:
      return "";
  }
  return ""; // 유효성 검사 통과 시 빈 문자열 반환
};