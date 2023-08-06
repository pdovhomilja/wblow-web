import axios from "axios";

export async function getLicense(id: string) {
  const license = await axios.get(
    `${process.env.WBLOW_ADMIN_URL}/api/licenses/${id}`
  );
  return license.data;
}
