/**
 * Created by CAOYI on 2017/11/2.
 */
export default class Batcher {
    constructor() {
        this.reset();
    }

    reset() {
        this.has     = {};
        this.queue   = [];
        this.waiting = false;
    }

    push(job) {
        if (!this.has[job.id]) {
            this.queue.push(job);
            this.has[job.id] = job;
            if (!this.waiting) {
                this.waiting = true;

                setTimeout(() => {
                    this.flush();
                });
            }
        }
    }

    /**
     * 执行 并清空事件队列
     */
    flush() {
        this.queue.forEach((job) => {
            // job.cb.call(job.ctx);
            job.run(job.ctx);
        });
        this.reset();
    }
}