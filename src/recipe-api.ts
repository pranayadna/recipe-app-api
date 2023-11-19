const apiKey = process.env.API_KEY

export const searchRecipes = async (searchTerm: string, page: number) => {

    if (!apiKey) {
        throw new Error("API Key not found");
    }

    const baseUrl = "https://api.spoonacular.com/recipes/complexSearch"
    const url = new URL(baseUrl)

    const queryParams = {
        apiKey,
        query: searchTerm,
        number: "10",
        offset: ((page - 1) * 10).toString()
    }

    url.search = new URLSearchParams(queryParams).toString()

    try {
        const searchResponse = await fetch(url)
        const resultsJson = await searchResponse.json()
        return resultsJson
    } catch (error) {
        console.error(error)
    }
}

export const getRecipeSummary = async (recipeId: string) => {
    if (!apiKey) {
        throw new Error("API Key not found");
    }

    const url = new URL(`https://api.spoonacular.com/recipes/${recipeId}/summary`)

    const params = {
        apiKey
    }

    url.search = new URLSearchParams(params).toString()

    const response = await fetch(url)
    const json = await response.json()
    return json
}

export const getFavouriteRecipesByIds = async (ids: string[]) => {
    if (!apiKey) {
        throw new Error("API Key not found");
    }

    const url = new URL("https://api.spoonacular.com/recipes/informationBulk")

    const params = {
        apiKey,
        ids: ids.join(",")
    }

    url.search = new URLSearchParams(params).toString()

    const response = await fetch(url)
    const json = await response.json()
    return { results: json }
}
