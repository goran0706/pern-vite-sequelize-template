import fs from 'fs';

export const readFileSync = (path) => {
    return fs.readFileSync(path);
};

export const readCredentialsSync = (keyPath, certPath) => {
    const privateKey = readFileSync(keyPath);
    const certificate = readFileSync(certPath);
    return {key: privateKey, cert: certificate};
};

export const getCurrentWorkingDirectory = () => {
    return process.cwd();
};
