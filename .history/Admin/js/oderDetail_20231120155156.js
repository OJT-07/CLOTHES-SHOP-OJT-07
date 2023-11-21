function getBearerToken() {
    const userString = localStorage.getItem('user');
    if (userString) {
        const userData = JSON.parse(userString);
        return userData.access_token || null;
    }
    return null;
}

async function fetchData() {
    try {
        const token = getBearerToken();
        const response = await fetch(`https://web-api-5vrh.onrender.com/api/orders/${orders._id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

