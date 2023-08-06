import axios from "axios";

export async function getActiveUsers(publicKey: string) {
  const activeUsers = await axios.get(
    `${process.env.WBLOW_WEB_URL}/api/user/${publicKey}`
  );
  return activeUsers.data;
}
