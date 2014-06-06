<?php

/**
 * IndexController
 *
 * @author Someone <someone@valtech.co.uk>
 */
namespace Application\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

/**
 * IndexController
 *
 * @author Someone <someone@valtech.co.uk>
 */
class IndexController extends AbstractActionController
{
    public function notFoundAction()
    {
        $routeMatch = $this->getEvent()->getRouteMatch();
        $method = $routeMatch->getParam('action');

        $view = new ViewModel(['method' => $method]);
        $view->setTemplate('styleguide/' . $method . '.phtml');
        return $view;
    }

    public function indexAction()
    {
        return new ViewModel();
    }
}
