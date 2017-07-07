function modifyWorker(worker) {

    if (worker.handsShaking){
        let required = worker.weight * 0.1 * worker.experience;
        worker.bloodAlcoholLevel += required;
        worker.handsShaking = false;
    }
    return worker;
}

let worker = { weight: 95,
    experience: 3,
    bloodAlcoholLevel: 0,
    handsShaking: false }

;

modifyWorker(worker);


