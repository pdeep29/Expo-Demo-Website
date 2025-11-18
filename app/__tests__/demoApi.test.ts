import { fetchUser } from "@/services/demoApi";
import fetchMock from "jest-fetch-mock";
const typedFetch = fetch as typeof fetchMock;

beforeEach(() => {
    typedFetch.resetMocks();
});
test("fetchUser returns user data", async () => {
    const mockUser = { userId: 1, title: "delectus aut autem", };
    typedFetch.mockResponseOnce(JSON.stringify(mockUser));

    const result = await fetchUser("1");
    expect(result).toEqual({ userId: 1, title: "delectus aut autem", });
    expect(result).toEqual(expect.objectContaining({ userId: 1 }));

    expect(typedFetch).toHaveBeenCalledWith("https://jsonplaceholder.typicode.com/todos/1");
});


test("fetchUser throws error on failure", async () => {
    typedFetch.mockResponseOnce("Not Found", { status: 404 });

    await expect(fetchUser("999")).rejects.toThrow("Failed to fetch user");
});
