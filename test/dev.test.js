const path = require('path');
const { expect } = require('chai');
const execa = require('execa');
const rm = require('rimraf').sync;

describe('command: dev', () => {
    const initCli = path.join(__dirname, '../bin/kubevue-init');
    const devCli = path.join(__dirname, '../bin/kubevue-dev');
    const originalCwd = process.cwd();
    let projectRoot;

    const setup = () => {
        process.chdir(path.join(__dirname, './mock-kubevue-project'));
    };

    const teardown = (done) => {
        process.chdir(projectRoot);
        rm('*');
        process.chdir(originalCwd);
        done();
    };

    describe('dev app type kubevue project', () => {
        before((done) => {
            setup();
            execa(initCli, ['app', 'app-project'])
                .then((res) => {
                    projectRoot = process.cwd();
                    process.chdir(path.join(projectRoot, './app-project'));
                    return execa('npm', ['i']);
                })
                .then((res) => {
                    done();
                })
                .catch(done);
        });

        after(teardown);

        it('should start dev-server successfully', (done) => {
            const childProcess = execa(devCli, [], {
                stdio: ['ipc'],
            });

            childProcess.on('message', (kubevueConfig) => {
                expect(kubevueConfig).to.be.an('object');
                expect(kubevueConfig.type).to.equal('app');
                done();
            });

            childProcess.on('exit', (code) => code ? done(code) : done());
        });

        it('should run with local config', (done) => {
            const childProcess = execa(devCli, ['-e', 'index.js', '-d', 'true', '-p', '4430', '-H'], {
                stdio: ['ipc'],
            });

            childProcess.on('message', (kubevueConfig) => {
                const { webpack: { entry: { bundle: entryPath } }, webpackDevServer: { port }, hot } = kubevueConfig;
                expect(entryPath).to.equal('index.js');
                expect(port).to.equal(4430);
                /* eslint-disable no-unused-expressions */
                expect(hot).to.be.false;
                /* eslint-enable no-unused-expressions */
                done();
            });

            childProcess.on('exit', (code) => code ? done(code) : done());
        });
    });

    describe('dev library type kubevue project', () => {
        before((done) => {
            setup();
            execa(initCli, ['library', 'library-project'])
                .then((res) => {
                    projectRoot = process.cwd();
                    process.chdir(path.join(projectRoot, './library-project'));
                    return execa('npm', ['i']);
                })
                .then((res) => {
                    done();
                })
                .catch(done);
        });

        after(teardown);

        it('should start dev-server successfully', (done) => {
            const childProcess = execa(devCli, [], {
                stdio: ['ipc'],
            });

            childProcess.on('message', (kubevueConfig) => {
                expect(kubevueConfig).to.be.an('object');
                expect(kubevueConfig.type).to.equal('library');
                done();
            });

            childProcess.on('exit', (code) => code ? done(code) : done());
        });

        // it('should run with local config', (done) => {
        //     const childProcess = execa(devCli, ['-l', './index.js'], {
        //         stdio: ['ipc'],
        //     });

        //     childProcess.on('message', (kubevueConfig) => {
        //         const { libraryPath } = kubevueConfig;
        //         expect(libraryPath).to.equal('./index.js');
        //         done();
        //     });

        //     childProcess.on('exit', (code) => code ? done(code) : done());
        // });
    });
});
