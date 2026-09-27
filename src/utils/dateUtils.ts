export function FormatRelativeTime(dateString: string): string {

    const date = new Date(dateString);
    const now = new Date();

    const diffInSeconds = Math.floor(
        (now.getTime() - date.getTime())
    ) / 1000

    if(diffInSeconds < 60) {
        return "just now";
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);

    if(diffInMinutes < 60) {
        return `${diffInMinutes} min ago`;
    }

    const diffInHours = Math.floor(diffInMinutes/ 60);

    if(diffInHours < 24) {
        return `${diffInMinutes} hours ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);

    return `${diffInDays} days ago`;
}


export function formatExpiresAt(dateString: string | null): string {

    if(!dateString) {
        return "no expiration";
    }

    const date = new Date(dateString);
    const now = new Date();

    const diffInSeconds = Math.floor((date.getDate() - now .getDate()) / 1000);

    if(diffInSeconds<=0) {
        return "Expired";
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);

    if(diffInMinutes < 60) {
        return `Expires in ${diffInMinutes} min`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);

    if(diffInHours < 24) {
        return `Expires in ${diffInMinutes} hours`;
    }

    const diffInDays = Math.floor(diffInHours / 24);

    return `$Expires in ${diffInDays} days`;

}