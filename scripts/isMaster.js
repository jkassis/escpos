import { exec } from 'child_process'

exec('git rev-parse --abbrev-ref HEAD', function (error, branch) {
    if (branch === "master\n") process.exit(0);
    else {
        console.log("Branch is not master, failing...");
        process.exit(1);
    }
});