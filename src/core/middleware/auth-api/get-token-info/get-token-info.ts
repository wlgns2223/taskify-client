export const getTokenInfo = <T>(
  authHeader: string,
  type: "realm" | "error"
) => {
  // Regex ex Bear realm=ACESS_TOKEN,error=UNDEFINED
  const regex = new RegExp(`${type}=([^;]+)`);
  const matched = authHeader.match(regex);
  if (!matched) {
    return null;
  }

  const matchedValueByType = matched[1] as unknown as T;
  return matchedValueByType;
};
