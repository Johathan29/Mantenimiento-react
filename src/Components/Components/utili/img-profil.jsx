export default function ImgProfile({datadropdowntoggle,datadropdownplacement,className,src}){
    return(
        <>
        <img
                id="avatarButton"
                type="button"
                data-dropdown-toggle={datadropdowntoggle}
                data-dropdown-placement={datadropdownplacement}
                className={className}
                src={src}
                alt="User avatar"
              />
        </>
    )
}