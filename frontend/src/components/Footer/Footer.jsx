import React from 'react'

function Footer() {
    return (
        <footer
            className=" w-[100%] text-center bottom-0 border-t">
            <div className=" text-PrimaryColors font-body font-bold text-xl xl:p-6 max-xl:p-4 max-lg:p-3 max-sm:p-2 dark:text-neutral-200">
                © 2023 Copyright:
                <a href='#' className=' text-InactivePrimary hover:text-PrimaryColors'> Dev by ISO</a>
            </div>
        </footer>
    );
}

export default Footer;