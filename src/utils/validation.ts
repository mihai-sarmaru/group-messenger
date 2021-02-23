export const validateRoomName = (roomName: string): boolean => {
    return (roomName.length >= 3 && roomName.length < 25);
}