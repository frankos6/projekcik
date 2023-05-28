export function addFavorite(name: string){
    const favorites = getFavorites();
    if (!favorites.includes(name)) favorites.push(name)
    localStorage.setItem("stockfav",JSON.stringify(favorites))
}

export function getFavorites(): string[] {
    return JSON.parse(localStorage.getItem("stockfav")||"[]") as string[];
}

export function removeFavorite(name: string) {
    const favorites = getFavorites();
    const index = favorites.indexOf(name);
    if (index > -1) favorites.splice(index,1);
    localStorage.setItem("stockfav",JSON.stringify(favorites))
}