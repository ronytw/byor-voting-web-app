import { VotingEvent } from '../models/voting-event';

function getIdentificationType(votingEvent: VotingEvent) {
  return getFlowStep(votingEvent).identification.name;
}

export function getIdentificationRoute(votingEvent: VotingEvent) {
  const identificationType = getIdentificationType(votingEvent);
  let route: string;
  if (identificationType === 'login') {
    route = 'login-voting-event';
  } else if (identificationType === 'nickname') {
    route = 'nickname';
  } else {
    throw new Error(`No route defined for identification type ${identificationType}`);
  }
  return route;
}

export function getActionParameters(votingEvent: VotingEvent) {
  return getFlowStep(votingEvent).action.parameters;
}

export function getActionName(votingEvent: VotingEvent) {
  return getFlowStep(votingEvent).action.name;
}

export function getNextAction(votingEvent: VotingEvent) {
  const nextFlowStep = getNextFlowStep(votingEvent);
  return nextFlowStep ? nextFlowStep.action : null;
}
export function getNextActionName(votingEvent: VotingEvent) {
  const nextAction = getNextAction(votingEvent);
  return nextAction ? nextAction.name : null;
}

export function getPreviousAction(votingEvent: VotingEvent) {
  const previousFlowStep = getPreviousFlowStep(votingEvent);
  return previousFlowStep ? previousFlowStep.action : null;
}
export function getPreviousActionName(votingEvent: VotingEvent) {
  const nextAction = getPreviousAction(votingEvent);
  return nextAction ? nextAction.name : null;
}

export function getActionRoute(votingEvent: VotingEvent) {
  const actionName = getActionName(votingEvent);
  let route: string;
  if (actionName === 'vote') {
    route = 'vote/start';
  } else if (actionName === 'conversation') {
    route = 'conversation';
  } else if (actionName === 'recommendation') {
    route = 'recommendation';
  } else {
    throw new Error(`No route defined for action name "${actionName}"`);
  }
  return route;
}

function getFlowStep(votingEvent: VotingEvent) {
  if (!votingEvent.flow) {
    throw new Error(`Voting Event ${votingEvent.name} does not have a flow defined`);
  }
  const round = votingEvent.round ? votingEvent.round : 1;
  if (votingEvent.flow.steps.length < round) {
    throw new Error(`Voting Event ${votingEvent.name} does not have a step defined in its flow for round ${round}`);
  }
  return votingEvent.flow.steps[round - 1];
}
function getNextFlowStep(votingEvent: VotingEvent) {
  if (!votingEvent.flow) {
    throw new Error(`Voting Event ${votingEvent.name} does not have a flow defined`);
  }
  const round = votingEvent.round ? votingEvent.round : 1;
  return votingEvent.flow.steps.length > round ? votingEvent.flow.steps[round] : null;
}
function getPreviousFlowStep(votingEvent: VotingEvent) {
  if (!votingEvent.flow) {
    throw new Error(`Voting Event ${votingEvent.name} does not have a flow defined`);
  }
  const round = votingEvent.round ? votingEvent.round : 1;
  return round > 1 ? votingEvent.flow.steps[round - 2] : null;
}
