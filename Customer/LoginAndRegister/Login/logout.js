const logout = () => {
    localStorage.removeItem('user');
    window.location.reload();
}

