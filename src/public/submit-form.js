function submitForm(){
    const avatarName = document.getElementById('avatarname').value
    const childAge = parseInt(document.getElementById('childage').value)
    const skinColor = document.getElementById('skincolor').value
    const hairstyle = document.getElementById('hairstyle').value
    const headShape = document.getElementById('headshape').value
    const upperClothing = document.getElementById('upperClothing').value
    const lowerClothing = document.getElementById('lowerClothing').value

    const data = {
        avatarName,
        childAge,
        skinColor,
        hairstyle,
        headShape,
        upperClothing,
        lowerClothing
    }

    fetch("/api/avatars", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic " + btoa("maria@home.edu:123")
        },
        body: JSON.stringify(data)
    })
}