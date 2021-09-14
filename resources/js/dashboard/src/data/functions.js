export const naira = (value) => {
    return "₦" + Math.round(parseFloat(value)).toLocaleString();
};

export const roi = (plan) => {
    return ((100 + plan.roi) / 100) * plan.price;
};

export const paintStatus = (status) => {
    switch (status) {
        case "success":
            return "badge-success";
            break;
        case "complete":
            return "badge-success";
            break;
        case "disapproved":
            return "badge-danger";
            break;
        case "failed":
            return "badge-danger";
            break;
        case "pending":
            return "badge-warning";
            break;

        default:
            return "badge-light";
            break;
    }
};

export function deslug(value){
    return value.replace(/_/g, ' ').replace(/-/g, ' ')
}
