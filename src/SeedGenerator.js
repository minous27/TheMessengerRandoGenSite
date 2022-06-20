

export function GenerateSeed() {
    let today = Date.now();

    return (today & 0x0000BEEF);
}


