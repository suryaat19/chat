import { send } from "process";
import { sendResetLink } from "../actions";

export default function ResetPage() {
    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <div className="w-[25%] card card-border card-lg bg-base-100">
                <div className="card-body">
                    <h1 className="card-title">Reset Password</h1>
                    <form className="flex flex-col gap-3">
                        <input
                            className="input"
                            placeholder="E-mail"
                            id="email"
                            name="email"
                            type="email"
                            required
                        />
                        <div className="card-actions">
                            <button className="btn-primary btn" type="submit" formAction={sendResetLink}>
                                Send Reset Link
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}