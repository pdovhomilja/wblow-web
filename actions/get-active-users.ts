import axios from "axios";

export async function getActiveUsers(publicKey: string) {
  const activeUsers = await axios.get(
    `${process.env.WBLOW_APP_URL}/api/user/${publicKey}`
  );
  return activeUsers.data;
}
