import React, { useEffect, useState } from "react";
import SelectSearch, { fuzzySearch } from "react-select-search";
import "../styles/select.css";

function SearchSelect({
    planOptions,
    search,
    filterOptions,
    emptyMessage,
    placeholder,
    onSelect,
}) {
    function handlePlanSelected(e) {
        onSelect(e);
    }
    return (
        <SelectSearch
            options={planOptions}
            search={search}
            filterOptions={fuzzySearch}
            emptyMessage={emptyMessage}
            placeholder={placeholder}
            onChange={handlePlanSelected}
        />
    );
}

export default SearchSelect;
