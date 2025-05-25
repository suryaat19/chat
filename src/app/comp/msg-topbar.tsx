export default function TopInfo() {
    //use if else logic to check if user is online or offline
    // this is a placeholder for userName and nickName, replace with actual user data
    //theme option is given
    return (
        <> 
            <div className="navbar bg-base-100 shadow-sm">
                <div className="flex align-center justify-between w-full">
                    <div className="dropdown dropdown-start">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar avatar-online">
                            <div className="w-10 bg-red-400 rounded-full"><img alt="" src="" /></div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li>
                                <a className="justify-between">Details<span className="badge">[userName]</span></a>
                            </li>
                            <li><a>Profile</a></li>
                            <li><a>Block</a></li>
                        </ul>
                    </div>
                    {/* Offline
                    <div className="dropdown dropdown-start">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 bg-red-400 rounded-full"><img alt="" src="" /></div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li>
                                <a className="justify-between">Details<span className="badge">[userName]</span></a>
                            </li>
                            <li><a>Profile</a></li>
                            <li><a>Block</a></li>
                        </ul>
                    </div>
                    */}
                    <a className="btn btn-ghost text-xl">[nickName]</a>
                    <label className="label mt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-3.67-3.67A19.79 19.79 0 0 1 2 4.18 2 2 0 0 1 4.18 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                        </svg>
                    </label>
                    <label className="label ml-2 mt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-9A2.25 2.25 0 002.25 5.25v13.5A2.25 2.25 0 004.5 21h9a2.25 2.25 0 002.25-2.25V15l5.25 3V6l-5.25 3z"/>
                        </svg>
                    </label>
                    <select defaultValue="Theme" className="select w-[7rem]">
                        <option disabled={true}>Theme</option>
                        <option>Indigo</option>
                        <option>Gray</option>
                        <option>Amber</option>
                        <option>Blue</option>
                    </select>
                </div>
            </div>

            
            
        </>
        
    );
}