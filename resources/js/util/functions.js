export const naira = (value) => {
    return "₦" + (parseFloat(value)).toLocaleString();
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

export function deslug(value) {
    return value.replace(/_/g, " ").replace(/-/g, " ");
}

export function discountValue(discount, amt, usr = null) {
    let final = 0;
    let discount_value = getDiscountValue(discount, usr);

    if (discount.type === "percentage") {
        final = (discount_value / 100) * amt;
        return final;
    }

    if (discount.type === "fixed") {
        final = amt - discount_value;
        return final;
    }

    return final;
}

export function getDiscountValue(discount, usr = null) {
    return usr?.is_agent
        ? discount.value.agent
        : discount.value.user;
}
