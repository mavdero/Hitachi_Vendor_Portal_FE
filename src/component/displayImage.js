import React, { Component } from 'react';
import apiService from "../services/api.service";
class Image extends Component {
    constructor(props) {
        super(props);
        this.state = {
            img: ''
        };
    };
    arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };
    componentDidMount() {
        apiService.getImage()
            .then(data => {
                var base64Flag = 'data:image/jpeg;base64,';
                var imageStr = this.arrayBufferToBase64(data.data.result[0].image.data);
                this.setState({
                    img: base64Flag + imageStr
                })
                console.log("imageStr", base64Flag + imageStr);
            })
           
            console.log("image",this.state);
    }
    render() {
        const { img } = this.state;
        return (
            <img
                src={img}
                alt='Helpful alt text' />
        )
    }

}
export default Image;