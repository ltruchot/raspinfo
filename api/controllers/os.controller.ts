// import { spawnSync } from 'child_process';
import { readFileSync } from 'fs';
import { Request, Response } from 'express';
import { IOsInfos } from '@shared/model/os-infos.model';

export function readOs (_req: Request, res: Response): void {
	console.log('os.controller::readOs');
	const osRelease: Buffer = readFileSync('/etc/os-release');
	const osLines: string[] = osRelease.toString().replace(/"/g, '').split('\n');
	const osObject: IOsInfos = {};
	osLines.forEach((line: string) => {
		const splittedLine = line.split('=');
		osObject[splittedLine[0]] = splittedLine[1];
	});
	res.json(JSON.stringify(osObject));
}
