export default () => {
        let script_tag = document.createElement('script');
        script_tag.setAttribute("type","text/javascript");
        script_tag.setAttribute("src",`http://maps.google.com/maps/api/js?&key=${process.env.GOOGLE_API_KEY}&libraries=&v=weekly`);
        (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
}