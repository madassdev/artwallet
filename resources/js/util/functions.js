export const naira = (value) => {
    return "₦" + Math.round(parseFloat(value)).toLocaleString();
};

export const roi = (plan) => {
    return ((100 + plan.roi) / 100) * plan.price;
};

export const paintStatus = (status) => {
    switch (status) {
        case "active":
            return "text-green-400";
            break;
        case "complete":
            return "text-green-400";
            break;
        case "success":
            return "text-green-400";
            break;
        case "running":
            return "text-primary";
            break;
        case "pending":
            return "text-primary";
            break;

        default:
            return "text-green-400 ";
            break;
    }
};

export function deslug(value){
    return value.replace(/_/g, ' ').replace(/-/g, ' ')
}
