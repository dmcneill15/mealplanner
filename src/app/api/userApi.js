const baseURL = "/api/user"; // base URL using NextJS API Router

export const addUser = async (newUser) => {
    try {
        const response = await fetch('/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        });

        if (response.ok) {
            //console.log(response);
            return response.json();
        } else {
           // console.error('Failed to add user');
            return response.json();
        }
    } catch (error) {
        //console.error('Error adding user:', error);
        throw error;
    }
}; 
