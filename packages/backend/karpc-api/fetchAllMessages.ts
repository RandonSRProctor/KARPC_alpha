/**
 *
 * TODO: This should have each Promise outcome typed
 */

export async function fetchAllMessages() {
  const result = await fetch("http://localhost:8080/conversation");
  return result;
}
