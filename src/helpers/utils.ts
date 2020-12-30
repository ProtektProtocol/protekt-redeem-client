import Promise from 'bluebird';
import axios from 'axios';
import config from '@/config';
import ipfs from '@/helpers/ipfs';
import pkg from '@/../package.json';

export function shorten(str = '') {
  return `${str.slice(0, 6)}...${str.slice(str.length - 4)}`;
}

export function jsonParse(input, fallback?) {
  if (typeof input !== 'string') {
    return fallback || {};
  }
  try {
    return JSON.parse(input);
  } catch (err) {
    return fallback || {};
  }
}

export function clone(item) {
  return JSON.parse(JSON.stringify(item));
}

export function etherscanLink(str: string, type = 'address'): string {
  const network = config.network === 'homestead' ? '' : `${config.network}.`;
  return `https://${network}etherscan.io/${type}/${str}`;
}

export function lsSet(key: string, value: any) {
  return localStorage.setItem(`${pkg.name}.${key}`, JSON.stringify(value));
}

export function lsGet(key: string) {
  const item = localStorage.getItem(`${pkg.name}.${key}`);
  return jsonParse(item, '');
}

export function lsRemove(key: string) {
  return localStorage.removeItem(`${pkg.name}.${key}`);
}

export function formatProposal(proposal) {
  proposal.msg = jsonParse(proposal.msg, proposal.msg);

  // v0.1.0
  if (proposal.msg.version === '0.1.0') {
    proposal.msg.payload.start = 1595088000;
    proposal.msg.payload.end = 1595174400;
    proposal.msg.payload.snapshot = 10484400;
    proposal.bpt_voting_disabled = '1';
  }

  return proposal;
}

export function formatProposals(proposals) {
  return Object.fromEntries(
    Object.entries(proposals).map(proposal => [
      proposal[0],
      formatProposal(proposal[1])
    ])
  );
}

export const isTxReverted = error => {
  return !error ? false : error.code === -32016;
};

export const isTxRejected = error => {
  return !error ? false : error.code === 4001 || error.code === -32603;
};

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function getSnapshot() {
  const networkStr = config.chainId === 1 ? '' : '-kovan';
  let snapshot = {}
  try {
    const response = await axios.get(`${config.repo}/reports/${config.tokenSymbol}/snapshot.json`);
    snapshot = response.data
    console.log(response);
  } catch (error) {
    console.error(error);
  }

  return snapshot
}

export async function getReport(snapshot, week) {
  let report = {};
  let response
  try {
    response = await axios.get(`${config.repo}/reports/${config.tokenSymbol}/${week}/_totals.json`);
    report = response.data
    console.log(response);
  } catch (error) {
    report = {}
    console.error(error);
  }
  return report;
}

export async function getReports(snapshot, weeks) {
  const reports = {};
  let response
  for (const week of weeks) {
    try {
      response = await axios.get(`${config.repo}/reports/${config.tokenSymbol}/${week}/_totals.json`);
      reports[week] = response.data
      console.log(response);
    } catch (error) {
      reports[week] = {}
      console.error(error);
    }
  }
  return reports;
}
