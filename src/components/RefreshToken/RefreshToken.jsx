import React, { useEffect } from 'react'
import Cookies from 'js-cookie'

const RefreshToken = () => {

    const currentDevelopmentEnviroment = "https://agency-linker-beta.onrender.com/";

    const refreshCurrentUserToken = () => {
        const currentUserRefreshToken = Cookies.get("refresh_token");

        fetch(`${currentDevelopmentEnviroment}api/authentication/refresh_token/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ currentUserRefreshToken })
        })
        .then((response) => response.json())
        .then((data) => {
            // console.log(data)

            const newAccessToken = data.access
			Cookies.set("access_token", newAccessToken)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        refreshCurrentUserToken();

        const intervalId = setInterval(() => {
            refreshCurrentUserToken();
        }, 180000);

        return () => clearInterval(intervalId);

    }, [])


    return (
        <div></div>
    )
}

export default RefreshToken