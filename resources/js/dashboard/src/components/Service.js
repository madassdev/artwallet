import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
function Service(props) {
    
    return (
        <div>
            <h2>Services</h2>
            
            {props.services.map((service) => (
               <h2 key={service.id}>{service.title}</h2>
               ))}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        services: state.serviceState.services,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Service);