import { fetchRecipes, addRecipe, deleteRecipe, updateRecipe } from '../app/api/recipesApi';

/*Unit test for addUser functionality - mock responses from the API endpoint*/
describe('fetchRecipes', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    it('should fetch the recipes and return the recipes array', async () => {
        const mockRecipes = [
            {
                recipe_title: "Apple Pie",
                method: "Served warm",
                servings : "2",
                image : "#",
                user_id: "66f739adc717200fa34ac24c"
              },
              {
                recipe_title: "Spaghetti bolognese",
                method: "With beef or prok mince",
                servings : "4",
                image : "#",
                user_id: "66f739adc717200fa34ac24c"
              }
        ]

        const mockResponse = {
            result: 200,
            data: mockRecipes,
        };

        fetch.mockResponseOnce(JSON.stringify(mockResponse), { status: 200 });  //simulates return of 200 success

        const response = await fetchRecipes();

        expect(response).toEqual(mockRecipes);
        expect(fetch).toHaveBeenCalledWith(`/api/recipes`, { cache: 'no-cache' });
    });

    //If API endpoint returns 409 - user already exisits
    it('should throw an error if the fetch fails', async () => {

        fetch.mockRejectOnce(new Error('Failed to fetch recipes')); //simulates return of 409 fail

        await expect(fetchRecipes()).rejects.toThrow('Failed to fetch recipes');
        expect(fetch).toHaveBeenCalledWith(`/api/recipes`, { cache: 'no-cache' });
    });
});